import Button from "../UI/Button/Button";

export default function GamesList({ games }) {
  const displayGame = () => {
    //Do something
  };

  return (
    <div className="games-list">
      <div className="games-container">
        {games.map((game, idx) => {
          return (
            <Button
              variant={"classic"}
              size={{ width: "200px", height: "52px" }}
              clickHandler={() => displayGame()}
              key={idx}
            >
              {game.title}
            </Button>
          );
        })}
      </div>
      <div className="pages">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </div>
    </div>
  );
}

//fetch games then render due to param
