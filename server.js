var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://realtime.adelaidemetro.com.au/SiriWebServiceSAVM/SiriStopMonitoring.svc/json/SM?MonitoringRef=';

  function fetchStop(stopId) {
    request(url + stopId, function(error, response, body){
      if(!error){
        const data = JSON.parse(body).StopMonitoringDelivery[0].MonitoredStopVisit

        //console.log( data )
        for ( const { MonitoredVehicleJourney } of data ) {
          console.log( MonitoredVehicleJourney.LineRef.Value + ' To ' +
            MonitoredVehicleJourney.DestinationName[0].Value + ' ' +
            eval('new ' + MonitoredVehicleJourney.MonitoredCall.LatestExpectedArrivalTime.match(/Date\(\S+\)/)[0]))
        }
      }
    })
  }

  fetchStop(13649)
  fetchStop(13294)

  res.send('ok')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
