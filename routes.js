const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write("<html>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input name='message'>");
    res.write("<button type='submit' >Send</button>");
    res.write("</form>");
    res.write("</html>");
    res.end();
    return;
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.writeHead(302, { location: "/" });
        res.end();
      });
    });
    return;
  }
  res.write("<html>");
  res.write("<div>");
  res.write("my first page");
  res.write("</div>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
