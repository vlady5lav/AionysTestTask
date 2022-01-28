# Notes Manager

## Frontend (React / TypeScript)

> Don't forget to start Server before running the Client app ;-)

The first way to start the client is to execute `runClient.bat` or `runClient.sh`.

The second way to start the client is to open `Command Prompt / PowerShell / Terminal` in the `client` folder and type `npm install` to install all modules with required dependencies. And if everything is ok you can finally type `npm start` to start the client app.

> To manually access the client app you can follow the link [http://localhost:3050](http://localhost:3050) .

### Frontend Tests

```
You can just run `runClientTests.bat` or `runClientTests.sh` to start tests.
Also you can do the steps above by the second way, but instead of `npm start` type `npm run ci`.
```

## Backend (.NET 6 / ASP.NET)

The first way to start the server is to execute `runServer.bat` or `runServer.sh`.

The second way to start the server is to open the solution `NotesManagerServer.sln` in the `backend` folder in Visual Studio 2022, wait for it to initialize and press `Debug` in the top toolbar and select `Start Debugging` (`F5`) or `Start Without Debugging` (`Ctrl+F5`).

> SwaggerUI will open automatically if launched with Debugging. To manually access SwaggerUI you can follow the link
[http://localhost:5050/swagger/](http://localhost:5050/swagger/) .

### Backend Tests

```
Just run `runServerTests.bat` or `runServerTests.sh` to start tests.
Also you can run it through Visual Studio in the Tests menu in the top toolbar.
```
