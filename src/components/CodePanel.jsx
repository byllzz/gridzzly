import { useEffect, useState } from 'react';
export const CodePanel = ({ title, code, language = 'css' }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard!');
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  });

  return (
    <div className=" flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-zinc-100">{title}</h3>
        <button
          onClick={() => {
            copyToClipboard(code);
            setCopied(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium text-xs px-3 py-1 rounded transition-colors"
        >
          {copied ? 'Code Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className={`bg-zinc-950 p-4 rounded text-xs text-emerald-400 font-mono overflow-x-auto border border-zinc-900 whitespace-pre-wrap min-h-[${language === 'css' ? '100px' : '60px'}]`}
      >
        {code}
      </pre>
    </div>
  );
};
