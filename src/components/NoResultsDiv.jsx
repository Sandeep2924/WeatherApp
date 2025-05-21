const NoResultsDiv = () => {
  return (
    <div className="no-results">
      {/* Icon indicating no results or error */}
      <img src="icons/no-result.svg" alt="No results found" className="icon" />

      {/* Heading message displayed on error */}
      <h3 className="title">Something went wrong!</h3>

      {/* Informational message guiding the user */}
      <p className="message">
        We&apos;re unable to retrieve the weather details. Ensure you&apos;ve
        entered a valid city or try again later.
      </p>
    </div>
  );
};

export default NoResultsDiv;
