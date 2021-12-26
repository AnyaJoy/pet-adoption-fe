import logo from "../../Pictures/logo.png"

function LogoAndQuote() {
  return (
    <>
      <img className="logo" src={logo} />
      <div className="quote">
        “Until one has loved an animal, a part of one’s soul remains unawakened”
      </div>
      <div className="author">– Anatole France</div>
    </>
  );
}

export default LogoAndQuote;
