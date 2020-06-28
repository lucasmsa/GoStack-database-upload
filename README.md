# GoStack Challenges 📃
> GoStack is an 8-week Bootcamp from [RocketSeat](https://rocketseat.com.br/) that is mainly focused on teaching NodeJS, ReactJS, React-Native and 
 Typescript
 
 * Challenge description: https://git.io/JJveS
 * Test Results on `Jest_results.png`
 
 ## Challenge

- [x]  Create Migrations for `categories` and `transactions`
- [x]  Post Transactions with `title, value, type, category`
    - [x]  When storing a transaction in the database it should include the values of:  `id, title, value, type, category_id, created_at, updated_at`
    - [x]  For categories create a new table with the columns `id, title, created_at, updated_at`
    - [x]  Check if the category already exists, if it does use the existing `id` in the database
- [x]  Get all transactions, also displaying the user's balance at the end
- [x]  Delete a transaction using its ID
- [x]  Parse a csv file with informations about transactions `title, value, type, category` , store those transactions in the DB and in the end return them

