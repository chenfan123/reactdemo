import fs from 'fs'

export default () => {
	const  res = fs.readdirSync("./public/js").filter(item => item.endsWith(".js")).map(item => `<script src="/js/${item}"></script>`)
	return res.join("\n")
}

