const scriptPath = document.currentScript.src;
const currentDir = scriptPath.substring(0, scriptPath.lastIndexOf('/'))+"/";
//alertify.set('notifier','position', 'top-center');

window.addEventListener("load", function()
{
	const formDbConfig = document.querySelector("#formDbConfig");
	formDbConfig.addEventListener("submit", async function(e)
	{
		e.preventDefault();
		const response = await fetch(currentDir+"../ajax/createDbConfig.php", {method: "POST", body: new FormData(this)});
		const responseData = await response.json();
		
		if(responseData['type'] === "result")
		{
			console.log(responseData['body']);
<<<<<<< HEAD
			alertify.set('notifier','position', 'top-center');
=======
>>>>>>> 887bc41e67a8683e05742f4ee0d4e24e1c89df08
			alertify.success(responseData['body'],2); // implementacja prostego systemu powiadomień
			setTimeout(function()
			{
				location = "addProxy.php";
			}, 2500);
		}
		else if(responseData['type'] === "error")
		{
			console.error(responseData['body']);
<<<<<<< HEAD
			alertify.set('notifier','position', 'top-center');
=======
>>>>>>> 887bc41e67a8683e05742f4ee0d4e24e1c89df08
			alertify.error(responseData['body'],2); // implementacja prostego systemu powiadomień
		}
		else
			console.error(responseData);
	});
});