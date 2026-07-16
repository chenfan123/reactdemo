
import express from "express"
import App from "./App"
import React from "react"
import { renderToString } from "react-dom/server"
import getScript from "./getScript"

const app = express()
app.use(express.static("public"))


app.get("/{*splat}", (req, res) => {
	const html = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
				<div id="app">${renderToString(<App />)}</div>
				${getScript()}
			</body>
		</html>
	`
  res.send(html)
})

app.listen(3000, () => {
	console.log("server is running on port 3000")
})
