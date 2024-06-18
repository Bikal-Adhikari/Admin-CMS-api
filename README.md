# Login registration workflow

The workflow below explaning step how to build robust user registration process step by step guide:

## Step 1

Creating user and sending verification linked to user email.

1. FE: Send user form to backend.
2. BE: receive user and do the followings.
   -- get the password and encrypt.
   --create unique code and store it in the session table with email.
   --format url like `https://yourdomain.com/verify-user?c=ioybjkvbjnkk&e=user@email.com`
   --send the above link to the user email.
3. insert user in the user table.
4. response user saying check their email to verify the account

## Step 2

For user, opening email and following instructions to click the link received.

1. User clicks on the link in their email and redirected to our webpage `https://yourdomain.com/verify-user?c=ioybjkvbjnkk&e=user@email.com` .
2. With in our `verify-user` page, receive the `c` & `e` from the query string.
3. FE: Send the `c` & `e` to the server for verification
4. BE: create new api endpoint to receive the `{c,e}`
5. BE: check if the `c` & `e` matches with the session table and valid.
   -- If valid, update the user status to active and with `isEmailVerified` = `true` and remove the data from session table
   -- If not valid, show error message saying invalid link or expired link
   -- then, send email notifying the account has been activated and they can sign in now.
   --- response user the same
