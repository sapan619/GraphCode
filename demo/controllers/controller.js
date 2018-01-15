var app = angular.module('app', ['nvd3']);


app.controller('controller', 
function($scope,$http, readFileData) {
  $scope.fileDataObj = {};
//code to upload the file on server ie, to call a POST method and pass the JSON data  

$scope.uploadFile = function() {
  if ($scope.fileContent) {
    $scope.fileData = readFileData.processData($scope.fileContent);    
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 65
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]; },

            color: d3.scale.category10().range(),
            duration: 300,
           // useInteractiveGuideline: true,
            clipVoronoi: false,

            xAxis: {
                axisLabel: 'X Axis',
                showMaxMin: false,
                tickFormat: function(d){
                    return d3.format('2f')(Math.abs(d));
                }  
            },
            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format('2f')(Math.abs(d));
                },
                valueFormat: function(d){
                    return d3.format('2f')(Math.abs(d));
            },
                axisLabelDistance: 20
            },    
        }
    };
  }
  else{
    alert("Please choose a csv file to upload");
  }
   angular.element("input[type='file']").val(null);
   $scope.fileContent=null;
}
});

//code to receive the file content on upload
app.directive('readFile', function() {
    return {
        restrict: "A",
        scope: {
            readFile: "=",
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;
                        scope.$apply(function() {
                            scope.readFile = contents;
                        });
                    };
                    r.readAsText(files[0]);
                }
            });
        }
    };
});
app.factory('readFileData', function() {
    return{
    processData: function(csv_data) {
        var record = csv_data.split(/\r\n|\n/);
        var headers = record[0].split(',');
        var json = [];
        for (var i = 0; i < record.length; i++) {
            var list=[];
            var data = record[i].split(',');
            for(var k=1;k<data.length;k++){
                    list.push(data[k].split("|"));
            }

            var temp={
                "key":record[i].split(",")[0],
                "values":list
            }
            json.push(temp);
        }
            return json;
        }
    };
});



