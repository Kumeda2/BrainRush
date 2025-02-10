import Button from "../UI/Button/Button";

export default function PlayersPanel({ players, getAvatar, removePlayer }) {
  return (
    <div className="participates">
      {players ? (
        players.map((player) => (
          <div key={player.id} className="player">
            <div className="user-container">
              <img src={getAvatar(player.user)} />
              <p>{player.user}</p>
            </div>
            <Button
              variant={"classic"}
              clickHandler={() => removePlayer(player.id)}
            >
              Kick
            </Button>
          </div>
        ))
      ) : (
        <p>No players in the room yet</p>
      )}
    </div>
  );
}
