# MU_TechYouths

E-Furniture by Mushfiqur Rahman (173-115-039), and Tapan Kanti Basak (173-115-019)

# Introduction

This is a browser based app.

# Tools

1. AspNetCore : A developer platform which can be used any type of Applications. It is cross-platform and open-source.
2. React
3. Redux
4. Typescript

# Setup

1. dotnet new sln
2. dotnet new webapi -o API
3. dotnet sln add API
4. Go to API: dotnet tool install --global dotnet-ef --version 5.0.8

Some Installed Packages:

1. Material UI
2. react-router-dom
3. AXIOS
4. @mui/lab
5. react-redux
6. @reduxjs/toolkit

Microsoft.EntityFrameworkCore.Sqlite v5.08 with API.csproj
Microsoft.EntityFrameworkCore.Design v5.08 with API.csproj

Open nuget Gallery:

1. Microsoft.AspNetCore.Authentication.JwtBearer v5
2. Microsoft.AspNetCore.Identity.EntityFrame : use to create the tables and migration to give use everything

# How to run the app

Run APP in developer mode: Go to API -> dotnet run

# Migrations

dotnet ef migrations add InitialCreate -o Properties/Migrations

# Database Update
dotnet ef database update

# How to migrate a new app?
dotnet ef migrations add Cart

# How to open the database

1. ctl+p
2. type: >sql
3. open database
4. API\Store.db

# How to run backend?

dotnet watch run

# How to drop tha database?

dotnet ef database drop

# How to create a react app?

npx create-react-app public --template typescript --use-npm
ref: https://reactjs.org/docs/create-a-new-react-app.html

# What is TypeScript?

Typescript is a superset of JS. Brower only understand JS. It comes with compiler. It compiles typescrupt code JS.

# How to add CORS configuration to the browser?

In StartUp.cs:
services.AddCors();
app.UseCors(options => {
options.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
});

# Learning Resources and Reference

1. Learn to build an e-commerce store with .Net, React & Redux
https://www.udemy.com/course/learn-to-build-an-e-commerce-store-with-dotnet-react-redux/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.EN_cc.ROW&utm_content=deal4584&utm_term=_._ag_77879424134_._ad_535397245863_._kw__._de_c_._dm__._pl__._ti_dsa-1007766171312_._li_9069450_._pd__._&matchtype=&gclid=CjwKCAjw5s6WBhA4EiwACGncZcR9rQ6pdqvNT8NPZyI4R3SuxTXKzZo-9GBrWLlKxPEQFJBDmD2ArRoCuCQQAvD_BwE

2. React - The Complete Guide (incl Hooks, React Router, Redux)
https://www.udemy.com/course/react-the-complete-guide-incl-redux/
