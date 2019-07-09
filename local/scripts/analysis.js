const scriptPath = document.currentScript.src;
const currentDir = scriptPath.substring(0, scriptPath.lastIndexOf('/'))+"/";
//alertify.set('notifier','position', 'top-center');

fetchAnalyses();
addAnalysis();

async function addAnalysis()
{
    const addModal = document.querySelector("#addModal");
    const addButton = document.querySelector("#addAnalysis");
    const addAnalysisForm = document.querySelector("#addAnalysisForm");

    window.addEventListener("click", e=>
    {
        if(e.target === addModal)
        {
            addModal.style.display = "none";
        }
    });

    addButton.addEventListener("click", function()
    {
        addModal.style.display = "flex";
    });

    addAnalysisForm.addEventListener("submit", async function(e)
    {
        e.preventDefault();
        addModal.style.display = "none";

        const formData = new FormData(this);
        const response = await fetch(currentDir+"../ajax/addAnalyses.php", {method: "POST", body: formData});
        const responseData = await response.json();

        if(responseData['type'] === "result")
        {
                const analyses = document.querySelector("#analyses");
                while (analyses.lastChild)
                    analyses.lastChild.remove();
                fetchAnalyses();
                alertify.set('notifier','position', 'top-center');
                console.log(responseData['body']); // implementacja prostego systemu powiadomień
                alertify.success(responseData['body'],2);
        }
        else if(responseData['type'] === "error")
        {
            console.error(responseData['body']);
            alertify.set('notifier','position', 'top-center');
            alertify.error(responseData['body'],2); // implementacja prostego systemu powiadomień
        }
        else
            console.error("Error: " + responseData);
    });
}

async function fetchAnalyses()
{
    const response = await fetch(currentDir+"../ajax/fetchAnalyses.php?fetch=true", {method: "GET"});
    const responseData = await response.json();
    
    if(responseData['type'] === "result")
    {
        if(responseData['body'].length > 0)
        {
            responseData['body'].forEach((row, index) =>
            {
                const  analysis = createAnalisis(row);
                document.querySelector("#analyses").appendChild(analysis);

                analysis.addEventListener("click", function()
                {
                    //wykres
                    var ctx = document.getElementById("chart").getContext('2d');
                    var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [1,2,3,4,5,6,7,8,9],
                        datasets: 
                        [{
                            label: 'Data 1',
                            data: '<?php echo $data1; ?>',
                            backgroundColor: 'transparent',
                            borderColor:'rgba(255,99,132)',
                            borderWidth: 3
                        },
    
                        {
                            label: 'Data 2',
                            data: '<?php echo $data2; ?>',
                            backgroundColor: 'transparent',
                            borderColor:'rgba(0,255,255)',
                            borderWidth: 3	
                        }]
                    },
                 
                    options: {
                        scales: {scales:{yAxes: [{beginAtZero: false}], xAxes: [{autoskip: true, maxTicketsLimit: 20}]}},
                        tooltips:{mode: 'index'},
                        legend:{display: true, position: 'top', labels: {fontColor: 'rgb(255,255,255)', fontSize: 16}}
                    }
                });
                    /*var date = new Date();
                    

                    trace1 = {
                    type: 'scatter',
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    mode: 'lines',
                    name: 'Red',
                    line: {
                    color: 'rgb(219, 64, 82)',
                    width: 3
                    }
                };
  
                
  
                    var data = [trace1];
  
                Plotly.newPlot('graph', data, {}, {showSendToCloud: true});*/
  
  
                    // tworzy wykres
                    
                });
            });
        }
        else
            document.querySelector("#analyses").innerHTML = "Brak analiz";
    }
    else if(responseData['type'] === "error")
    {
        console.error(responseData['body']); // implementacja prostego systemu powiadomień
        alertify.set('notifier','position', 'top-center');
        alertify.error(responseData['body'],2);
    }
    else
        console.error("Error: " + responseData);
}

function createAnalisis(row)
{
    const analysis = document.createElement("div"); analysis.className = "analysis";
    const analysisId = document.createElement("div"); analysisId.className = "analysisId";
    const domain = document.createElement("div"); domain.className = "domain";
    const phrase = document.createElement("div"); phrase.className = "phrase";
    const deleteAnalysis = document.createElement("button"); deleteAnalysis.className = "deleteAnalysis";
    analysis.appendChild(analysisId);
    analysis.appendChild(domain);
    analysis.appendChild(phrase);
    analysis.appendChild(deleteAnalysis);
    analysisId.innerHTML = row.analysis_id;
    domain.innerHTML = row.domain;
    phrase.innerHTML = row.phrase;
    deleteAnalysis.innerHTML = "X";

    const infoBox = document.querySelector("#infoBox");
    const domainInfo = document.querySelector("#domainInfo");
    const phraseInfo = document.querySelector("#phraseInfo");
    let mouseDelay;
    const displayInfoBox = function()
    {
        mouseDelay = setTimeout(()=>
        {
            infoBox.style.display = "flex";
            domainInfo.innerHTML = row.domain;
            phraseInfo.innerHTML = row.phrase;
        }, 300);
    };
    const closeInfoBox = function()
    {
        clearTimeout(mouseDelay);
        infoBox.style.display = "none";
    };

    domain.addEventListener("mouseover", displayInfoBox);
    domain.addEventListener("mouseout", closeInfoBox);
    phrase.addEventListener("mouseover", displayInfoBox);
    phrase.addEventListener("mouseout", closeInfoBox);
    deleteAnalysis.addEventListener("click", function()
    {
        fetch(currentDir+`../ajax/deleteAnalysis.php?id=${row.analysis_id}`, {method: "GET"})
        .then(response=>
        {
            return response.json();
        })
        .then(responseData=>
        {
            if(responseData['type'] === "result")
            {
                const analyses = document.querySelector("#analyses");
                while (analyses.lastChild)
                    analyses.lastChild.remove();
                fetchAnalyses();

                console.log(responseData['body']); // implementacja prostego systemu powiadomień
                alertify.set('notifier','position', 'top-center');
                alertify.success(responseData['body'],2);
                
            }
            else if(responseData['type'] === "error")
            {
                console.error(responseData['body']); // implementacja prostego systemu powiadomień
                alertify.set('notifier','position', 'top-center');
                alertify.error(responseData['body'],2);
            }
            else
                console.error("Error: " + responseData);
        });
    });
    
    return analysis;
}