import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface DocumentProcessingRequest {
  documentId: string;
  fileData: string; // base64 encoded file
  filename: string;
  mimeType: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentId, fileData, filename, mimeType }: DocumentProcessingRequest = await req.json();
    
    console.log('Processing document:', { documentId, filename, mimeType });

    // Step 1: Extract text from document
    let extractedText = '';
    
    if (mimeType.includes('pdf')) {
      // For PDF files, we'll use a simplified text extraction
      // In production, you'd use a proper PDF parser
      extractedText = await extractTextFromPDF(fileData);
    } else if (mimeType.includes('image')) {
      // For images, simulate OCR
      extractedText = await performOCR(fileData);
    } else if (mimeType.includes('text') || mimeType.includes('document')) {
      // For text files, decode base64
      extractedText = atob(fileData);
    }

    console.log('Extracted text length:', extractedText.length);

    // Step 2: Generate AI summary and detect category
    const { summary, category, confidence } = await processWithAI(extractedText, filename);

    console.log('AI processing complete:', { category, confidence });

    // Step 3: Update document in database
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        status: 'completed',
        extracted_text: extractedText,
        ai_summary: summary,
        category: category,
        confidence_score: confidence,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId);

    if (updateError) {
      console.error('Error updating document:', updateError);
      throw updateError;
    }

    return new Response(JSON.stringify({
      success: true,
      documentId,
      extractedText,
      summary,
      category,
      confidence
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing document:', error);
    
    // Update document status to failed if we have documentId
    if (req.body) {
      try {
        const body = await req.json();
        if (body.documentId) {
          await supabase
            .from('documents')
            .update({
              status: 'failed',
              processing_error: error instanceof Error ? error.message : 'Unknown error',
              updated_at: new Date().toISOString()
            })
            .eq('id', body.documentId);
        }
      } catch (e) {
        console.error('Error updating failed document:', e);
      }
    }

    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function extractTextFromPDF(base64Data: string): Promise<string> {
  // Simplified PDF text extraction
  // In production, you'd use a proper PDF parsing library
  try {
    const pdfData = atob(base64Data);
    // This is a very basic approach - in reality you'd use pdf-parse or similar
    const textPattern = /BT\s*\/\w+\s+\d+\s+Tf\s*(.*?)\s*ET/g;
    const matches = pdfData.match(textPattern);
    return matches ? matches.join(' ').replace(/[^\w\s]/g, ' ') : 'PDF content could not be extracted';
  } catch (error) {
    console.error('PDF extraction error:', error);
    return 'PDF text extraction failed';
  }
}

async function performOCR(base64Image: string): Promise<string> {
  // Simulate OCR processing
  // In production, you'd use Tesseract.js, Google Vision API, or Azure Computer Vision
  console.log('Performing OCR on image...');
  
  // Placeholder OCR result
  return 'This is simulated OCR text from the uploaded image. In production, this would be actual text extracted from the image using OCR technology.';
}

async function processWithAI(text: string, filename: string): Promise<{
  summary: string;
  category: string;
  confidence: number;
}> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  console.log('Processing with OpenAI...');

  const prompt = `
You are an intelligent document processor for IntelliDocs AI. Analyze the following document and provide:

1. A concise summary (2-3 sentences)
2. Category classification (choose from: Engineering, HR, Legal, Finance, Maintenance, Operations)
3. Confidence score (0.0 to 1.0)

Document filename: ${filename}
Document content: ${text.substring(0, 4000)} // Limit to avoid token limits

Respond in JSON format:
{
  "summary": "Brief summary here",
  "category": "Category name",
  "confidence": 0.95
}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a document analysis AI. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('OpenAI response:', content);
    
    // Parse the JSON response
    const result = JSON.parse(content);
    
    return {
      summary: result.summary || 'Summary could not be generated',
      category: result.category || 'Operations',
      confidence: result.confidence || 0.5
    };

  } catch (error) {
    console.error('AI processing error:', error);
    
    // Fallback category detection based on filename
    const fallbackCategory = detectCategoryFromFilename(filename);
    
    return {
      summary: 'AI processing failed. Manual review required.',
      category: fallbackCategory,
      confidence: 0.3
    };
  }
}

function detectCategoryFromFilename(filename: string): string {
  const lower = filename.toLowerCase();
  
  if (lower.includes('hr') || lower.includes('human') || lower.includes('employee')) {
    return 'HR';
  } else if (lower.includes('legal') || lower.includes('contract') || lower.includes('agreement')) {
    return 'Legal';
  } else if (lower.includes('finance') || lower.includes('budget') || lower.includes('invoice')) {
    return 'Finance';
  } else if (lower.includes('engineer') || lower.includes('technical') || lower.includes('design')) {
    return 'Engineering';
  } else if (lower.includes('maintenance') || lower.includes('repair') || lower.includes('service')) {
    return 'Maintenance';
  } else {
    return 'Operations';
  }
}