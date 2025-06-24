//src/app/upcoming/page.tsx

const DumptfPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Added bg-black and p-4 for some padding inside the black box */}
      <div className="max-w-prose text-center text-sm text-white bg-black p-4 rounded-lg">
        <p className="mb-4">
          Have a question about Citizens' Loft, or how we can help you?    </p>
         <p className="mb-4">
          Email citizensloft@gmail.com 
        </p>
           <p className="mb-4">
          or call (855) 542-4434?
        </p>
      </div>
    </div>
  );
};

export default DumptfPage;