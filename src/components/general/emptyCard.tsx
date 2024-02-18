interface IProps{
    name:string
}
function EmptyCard({name}:IProps) {
  return (
    <div className="w-fit h-fit mx-auto mt-8 ">
    <div>
      <div className="max-w-36 sm:max-w-40 md:max-w-60 mb-5 mx-auto">
        <img src="/img/emptyorg.png" alt="Organization" className="w-full h-full object-cover" />
      </div>
      <p className="text-sm sm:text-base font-medium text-whitish text-center">
        There are not any <span className="text-brand">{name}</span> to show yet.
      </p>
    </div>
  </div>
  )
}

export default EmptyCard