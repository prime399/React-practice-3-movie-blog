import popcorn_icon from "../assets/popcorn-icon.png";

function NavBar({ moviesNumber, searchQuery, setSearchQuery }) {
  return (
    <>
      <div className="w-full bg-purple-900 h-9 flex justify-center items-center text-white font-semibold ">
        <div className="flex justify-center items-center mr-auto ml-3">
          {" "}
          <img
            src={popcorn_icon}
            alt="Popcorn icon"
            className="object-cover h-6 w-6 mr-2"
          />
          usePopcorn
        </div>
        <div className="mx-2">
          <input
            type="text"
            name=""
            id=""
            className="bg-purple-800 text-white rounded-md text-center"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mx-2 mr-3">
          Found <span className="font-bold">{moviesNumber}</span> results
        </div>
      </div>
    </>
  );
}

export default NavBar;
