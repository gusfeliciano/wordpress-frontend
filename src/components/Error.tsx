interface ErrorProps {
    message: string;
  }
  
  export default function Error({ message }: ErrorProps) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCD5DC]">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-[#1A385A] mb-4">Oops! Something went wrong</h1>
          <p className="text-[#769ABE]">{message}</p>
        </div>
      </div>
    );
  }