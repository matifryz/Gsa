<?php
	/* Database connection settings */
	$host = 'localhost';
	$user = 'locall';
	$pass = 'locall';
	$db = 'gsa';
	$mysqli = new mysqli($host,$user,$pass,$db) or die($mysqli->error);

	$data1 = '';
	$data2 = '';

	//query to get data from the table
	$sql = "SELECT * FROM `datastorage` ";
    $result = mysqli_query($mysqli, $sql);

	//loop through the returned data
	while ($row = mysqli_fetch_array($result)) {

		$data1 = $data1 . '"'. $row['position'].'",';
		$data2 = $data2 . '"'. $row['date'] .'",';
	}

	$data1 = trim($data1,",");
	$data2 = trim($data2,",");
?>
<?php

if(!file_exists("../../db.ini"))
{
	header("location: ../config/config.php");
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
	<title>Strona główna - Google SERP Analyzer</title>
	<meta name="description" content="Google Search Engine Results Page Analyzer zapewnia graficzną prezentację pozycji wyników organicznych danych domen w czasie">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--<meta http-equiv="X-UA-Compatible" content="ie=edge">-->
	<link rel="shortcut icon" type="image/x-icon" sizes="16x16" href="/favicon.ico">
	<link rel="stylesheet" href="../../styles/index.css">

	<link rel="stylesheet" href="../../styles/alertify.css"> <!-- -->
	<script type="text/javascript" src="../../scripts/alertify.js"></script>

	<!--<link rel="stylesheet" href="../../styles/vis-timeline-graph2d.css">
	<script type="text/javascript" src="../../scripts/vis-timeline-graph2d.js"></script>
	<script type="text/javascript" src="../../scripts/vis.js"></script>
	<!<script type="text/javascript" src="../../scripts/Chart.js"></script>
	<link rel="stylesheet" href="../../styles/Chart.css">-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
	<!--<script
			  src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

	<script src="https://cdn.plot.ly/plotly-1.2.0.min.js"></script>-->
</head>
<body>
<h1> Logo / header </h1>

<div id="addModal">
	<div id="addWindow">
		<form action="" method="POST" id="addAnalysisForm">
			<h2>Dodaj analizę</h2>

			<div id=addWindowBoxContainer>
				<div class="addWindowBox">
					<p class="addWindowText">Wprowadź domenę, która wraz z frazą będą służyć do określenia pozycji tej domeny w czasie dla wyników organicznych Google.</p>
					<input type="text" name="domain" placeholder="domena" class="textInput">
				</div>
				<div class="addWindowBox">
					<p class="addWindowText">Wprowadź frazę lub słowo kluczowe, dla którego Google zbuduje listę domen wyników organicznych (SERP), które posłużą do stworzenia wykresu.</p>
					<input type="text" name="phrase" placeholder="fraza" class="textInput">
				</div>
				<div class="addWindowBox">
					<p class="addWindowText">Wybierz język, dla którego Google zwróci wyniki organiczne. Dla słowa kluczowego (na przykład) \"pizza\" wyniki będą się różnić w zależności od języka.</p>
					<input type="radio" class="regionInput" name="region" value="pl">
					<img class="langFlag" src="poland.svg" alt="polish language">
					<input type="radio" class="regionInput" name="region" value="en">
					<img class="langFlag" src="england.svg" alt="engish language">
				</div>
			</div>

			<button id="saveAnalysis">Zapisz</button>
		</form>
	</div>
</div>

<div id="infoBox">
	<div id="domainInfo"></div>
	<div id="phraseInfo"></div>
</div>

<a href="../config/addProxy.php">Zarządzaj serwerami proxy</a>

<div id="analysesBox">
	<h2>Analizy</h2>
	<div id="analyses">
		<!-- automatyczne dodawanie -->
	</div>

	<button id="addAnalysis">Dodaj analizę</button>
</div>


<div id="graph"></div><!-- -->
<canvas id="myChart" width="100" height="100"></canvas>
<canvas id="line-chartcanvas"></canvas>
<div class="container">	
	    <h1>USE CHART.JS WITH MYSQL DATASETS</h1>       
			<canvas id="chart"></canvas>
			<div class="container">	
	    <h1>USE CHART.JS WITH MYSQL DATASETS</h1>       
			<canvas id="chart"></canvas>

			<script>
				var ctx = document.getElementById("chart").getContext('2d');
    			var myChart = new Chart(ctx, {
        		type: 'line',
		        data: {
		            labels: [1,2,3,4,5,6,7,8,9],
		            datasets: 
		            [{
		                label: 'position',
		                data: [<?php echo $data1; ?>],
		                backgroundColor: 'transparent',
		                borderColor:'rgba(255,99,132)',
		                borderWidth: 3
		            },

		            {
		            	label: 'Date',
		                data: [<?php echo $data2; ?>],
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
			</script>
	    </div>

			

</div>

<script src="../../scripts/analysis.js"></script>

<?php
require_once("footer.php");
?>


