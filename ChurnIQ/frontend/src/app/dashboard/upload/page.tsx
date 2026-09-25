
export default function UploadPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Upload Dataset</h1>
        <p className="text-gray-400">Import your historical customer data (CSV) to run batch risk analysis.</p>
      </div>

      <div className="bg-[#171717] border-2 border-dashed border-[#333] rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
        <div className="w-16 h-16 bg-[#262626] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">Click or drag CSV file to upload</h3>
        <p className="text-sm text-gray-500">Maximum file size 50MB. Ensure headers match the expected schema.</p>
      </div>

      <div className="bg-[#171717] rounded-xl border border-[#262626] p-6 mt-8">
        <h3 className="font-semibold text-lg mb-4">Data Processing Pipeline</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gray-600"></div>1. Schema Validation</li>
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gray-600"></div>2. Missing Value Imputation</li>
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gray-600"></div>3. Categorical Encoding</li>
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gray-600"></div>4. Batch Inference (Gradient Boosting)</li>
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gray-600"></div>5. SHAP Matrix Generation</li>
        </ul>
      </div>
    </div>
  );
}
