const AppBar = () => {
  return (
    <div className="flex fixed w-full h-16 bg-btn-500 justify-start p-2">
      <div className="grow-3">
        <input className="rounded-sm w-full h-full p-0 m-0"></input>
      </div>
      <div className="ml-3 grow-1">profile</div>
    </div>
  );
};

export default AppBar;
