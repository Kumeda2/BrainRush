CREATE TABLE game_host (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    CONSTRAINT unique_nickname UNIQUE(nickname)
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    game_name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    rating FLOAT,
    preview VARCHAR(500),
    private BOOLEAN NOT NULL,
    host_id INT NOT NULL,
    CONSTRAINT fk_host_id FOREIGN KEY (host_id) REFERENCES game_host(id) ON DELETE CASCADE,
    CONSTRAINT unique_game_name UNIQUE(game_name)
);

CREATE TABLE mark (
    id SERIAL PRIMARY KEY,
    mark INT NOT NULL,
    game_id INT NOT NULL,
    host_id INT NOT NULL,
    CONSTRAINT fk_game_id FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE,
    CONSTRAINT fk_host_id FOREIGN KEY (host_id) REFERENCES game_host(id) ON DELETE CASCADE,
    CONSTRAINT unique_mark UNIQUE(game_id, host_id)
);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    max_points INT NOT NULL,
    game_id INT NOT NULL,
    time INT NOT NULL DEFAULT 30,
    CONSTRAINT fk_game_id FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    answer VARCHAR(500) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    question_id INT NOT NULL,
    CONSTRAINT fk_question_id FOREIGN KEY(question_id) REFERENCES question(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_rating() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.mark IS DISTINCT FROM OLD.mark THEN
        UPDATE game
        SET rating = (
            SELECT AVG(mark)
            FROM mark
            WHERE game_id = NEW.game_id
        )
        WHERE id = NEW.game_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER create_rating
AFTER INSERT OR UPDATE ON mark
FOR EACH ROW
EXECUTE FUNCTION update_rating();
