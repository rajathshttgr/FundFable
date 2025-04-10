CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transaction (
    transaction_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    supporter_name VARCHAR(100),
    supporter_username VARCHAR(100),
    supporter_socialmedia VARCHAR(100) DEFAULT 'instagram',
	supporter_message TEXT,
	amount NUMERIC NOT NULL,
	transaction_success BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (user_id) REFERENCES users(user_id),

       -- Ensure at least one of the two fields is NOT NULL
    CHECK (
    supporter_name IS NOT NULL OR 
    supporter_username IS NOT NULL
    ),

       -- Ensure supporter_socialmedia is either 'instagram' or 'twitter'
    CHECK (
    supporter_socialmedia IN ('instagram', 'twitter')
    ),

      -- If supporter_username is NOT NULL, supporter_socialmedia must also be NOT NULL
    CHECK (
    supporter_username IS NULL OR supporter_socialmedia IS NOT NULL
    )
  );

CREATE TABLE IF NOT EXISTS profile(
  profile_id SERIAL PRIMARY KEY,
  bio TEXT,
  instagram VARCHAR(100),
  twitter  VARCHAR(100),
  linkedin VARCHAR(100),
  github VARCHAR(100),
  user_id INT NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(user_id)

);