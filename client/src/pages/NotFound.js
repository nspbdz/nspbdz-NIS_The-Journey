import not_found from "../assets/images/not_found.svg";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={not_found} alt="not found" width={500} height={500} />
      <h1>Page you're looking for is not found</h1>
    </div>
  );
};

export default NotFound;
