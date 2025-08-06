import { NextRequest, NextResponse } from 'next/server';
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '消息内容不能为空' },
        { status: 400 }
      );
    }

    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    return NextResponse.json({
      response: response.message.content,
    });
  } catch (error) {
    console.error('Ollama API error:', error);
    return NextResponse.json(
      { error: 'AI服务暂时不可用，请稍后再试' },
      { status: 500 }
    );
  }
}