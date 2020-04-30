const color = d3.scaleThreshold()
    .domain([0, 50, 100, 150, 200])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);


function renderChloropleth(opt) {

    d3.selectAll("#graphicContainer > *").remove();

    document.getElementById('policeBeatsOption').classList.remove('active');
    document.getElementById('zipcodesOption').classList.remove('active');
    document.getElementById('districtsOption').classList.remove('active');
    document.getElementById(`${opt}Option`).classList.add('active');

    if (opt === 'policeBeats') {
        document.getElementById('geoDivisionButton').innerHTML = "Police Beats";
    }
    else if (opt === 'zipcodes') {
        document.getElementById('geoDivisionButton').innerHTML = "Zip Codes";
    }
    else if (opt === 'districts') {
        document.getElementById('geoDivisionButton').innerHTML = "Districts";
    }

    let mapDiv = document.getElementById("graphicContainer");
    let svg = d3.select(mapDiv).append("svg");
    const filepath = `../static/resources/scores/${opt}_ordered.json`;

    $.getJSON(`${filepath}`, function (data) {

        // alter SVG
        svg
            .attr("width", 700)
            .attr("height", 600);

        // Append empty placeholder g element to the SVG
        // g will contain geometry elements
        const g = svg.append("g");

        // width and height of the whole visualization by
        // setting projection parameters
        let albersProjection = d3.geoAlbers()
            .scale(82000)
            .rotate([87.5900, 0])
            .center([0, 41.8781])
        // .translate( [width, height] );

        // create GeoPath function that uses built-in D3 functionality to turn
        // lat/lon coordinates into screen coordinates (i.e. path generator)
        let geoPath = d3.geoPath()
            .projection(albersProjection);


        g.selectAll('path')
            .data(data.features) // Bind data elements here
            .enter()
            .append("path")
            .attr("stroke", "#333")
            .attr("d", geoPath)
            .attr("fill", function(d) {
                return color(d.properties.count_homicides);
            })
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);


    })

}


function handleMouseOver(d, i) { //add interactivity here

    // use D3 to select the element, change its color and size
    d3.select(this).attr("fill", "darkorange");
    // specify where to put label or text or additional features
    document.getElementById("infoDisplay").innerHTML = create_markup(d);

}

function handleMouseOut(d, i) { //add interactivity here

    // use D3 to select the element, change its color and size
    d3.select(this).attr("fill", function(d) {
        return color(d.properties.count_homicides);
    });
    // specify what to do with the label or text or additional features
    document.getElementById("infoDisplay").innerHTML = "";

}

function create_markup(data) {
    const markup = `
    <div class="row">
        <div class="col-md-10 mx-auto sidebar-title">N3 Geographic Division Profiles</div>
    </div>
    <div class="row">
        <div class="col-md-10 mx-auto sidebar-subtitle">${data.properties.geographic_delimiter}</div>
    </div>
    <div class="row">
        <div class="col-md-10 mx-auto" style="text-align: center; margin-top: 10px">
            <i class="fas fa-info-circle info-text">This infographic dynamically displays demographic, economic, and outreach data for each geographic division.</i>
        </div>
    </div>
    <div class="row infographic">
        <div class="col-md-12 mx-auto icon-square">
            <i class="fas fa-dollar-sign" style="font-size: 40px; margin-right: 10px;"></i> Economic Information
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 mx-auto infonumeral">
            <b>25%</b> below Poverty Line<br>
            <b>44%</b> currently Unemployed<br>
            <b>8%</b> currently Homeless<br>
        </div>
    </div>
    <div class="row infographic">
        <div class="col-md-12 mx-auto icon-square">
            <i class="fas fa-user" style="font-size: 40px; margin-right: 10px;"></i> Demographic Information
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 mx-auto infonumeral">
            <b>22%</b> White <br>
            <b>54%</b> Black <br>
            <b>18%</b> Hispanic <br>
        </div>
    </div>
    <div class="row infographic">
        <div class="col-md-12 mx-auto icon-square">
            <i class="fas fa-hands-helping" style="font-size: 40px; margin-right: 10px;"></i> Outreach Information
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 mx-auto infonumeral">
            <b>14</b> Current Outreach Workers
        </div>
    </div>
`;
    return markup
}





