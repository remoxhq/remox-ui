interface IProps{
    name:string
}
function EmptyOrg({name}:IProps) {
  return (
    <div className="lg:w-[672px] lg:h-[360px] md:w-[600px] md:h-[300px] sm:w-[500px] sm:h-[240px] w-[400px] h-[200px] overflow-hidden bg-darkBlue border rounded-xl flex items-center justify-center sm:mt-24 mt-20">
      <div>
        <div className="max-w-36 sm:max-w-40 md:max-w-60 mb-5 mx-auto">
          <img src="/img/emptyorg.png" alt="Organization" className="w-full h-full object-cover" />
        </div>
        <p className=" text-sm sm:text-base font-medium text-whitish text-center">
          There are not any <span className="text-brand">{name}</span> to show yet.
        </p>
      </div>
    </div>
  );
}

export default EmptyOrg;
