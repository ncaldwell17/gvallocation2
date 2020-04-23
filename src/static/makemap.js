const color = d3.scaleThreshold()
    .domain([0, 50, 100, 150, 200])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

function renderChloropleth() {

    let mapDiv = document.getElementById("graphicContainer");
    let svg = d3.select(mapDiv).append("svg");

    $.getJSON('../static/resources/scores/ordered_hpb.json', function (data) {

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

}

function handleMouseOut(d, i) { //add interactivity here

    // use D3 to select the element, change its color and size
    d3.select(this).attr("fill", function(d) {
        return color(d.properties.count_homicides);
    });
    // specify what to do with the label or text or additional features


}





