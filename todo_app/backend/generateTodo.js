async function main() {
  const response = await fetch("https://en.wikipedia.org/wiki/Special:Random");
  const randomUrl = response.url;

  const newTodo = {
    content: `Read ${randomUrl}`,
  };

  const res = await fetch("http://todo-backend-svc:2348/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  console.log("todo added", res);
}

main();
