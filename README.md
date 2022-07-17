# MU_TechYouths

E-Furniture by Mushfiqur Rahman (173-115-039), and Tapan Kanti Basak (173-115-019)

Introduction:

This is a browser based app.

Tools:

1. AspNetCore : A developer platform which can be used any type of Applications. It is cross-platform and open-source.
2. React
3. Redux
4. Typescript

Setup:

1. dotnet new sln
2. dotnet new webapi -o API
3. dotnet sln add API
4. Go to API: dotnet tool install --global dotnet-ef --version 5.0.8

Run APP in developer mode: Go to API -> dotnet run

Install:
Microsoft.EntityFrameworkCore.Sqlite v5.08 with API.csproj
Microsoft.EntityFrameworkCore.Design v5.08 with API.csproj

Migrations:
dotnet ef migrations add InitialCreate -o Properties/Migrations
dotnet ef database update

How to migrate a new app?
dotnet ef migrations add Cart

How to open the database?

1. ctl+p
2. type: >sql
3. open database
4. API\Store.db

How to run backend?
dotnet watch run

How to drop tha database?
dotnet ef database drop

How to create a react app?
npx create-react-app public --template typescript --use-npm
ref: https://reactjs.org/docs/create-a-new-react-app.html

What is TypeScript?
Typescript is a superset of JS. Brower only understand JS. It comes with compiler. It compiles typescrupt code JS.

How to add CORS configuration to the browser?
In StartUp.cs:
services.AddCors();
app.UseCors(options => {
options.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
});

Installed Packages:

1. Material UI
2. react-router-dom
3. AXIOS
4. @mui/lab
5. react-redux
6. @reduxjs/toolkit
7. react-scripts --save

Open nuget Gallery:

1. Microsoft.AspNetCore.Authentication.JwtBearer v5
2. Microsoft.AspNetCore.Identity.EntityFrame : use to create the tables and migration to give use everything
