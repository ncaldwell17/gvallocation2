function renderMap(input) {

    d3.selectAll("#container > *").remove();

    const mapDiv = document.getElementById("container");
    const svg = d3.select(mapDiv).append("svg");

    $.getJSON(`../static/resources/${input}.json`, function (data) {


        // Width & Height of the Whole Visualization
        // let width = mapDiv.clientWidth;
        // let height = mapDiv.clientHeight;

        // alter SVG
        svg
            .attr("width", 700)
            .attr("height", 600);

        // Append empty placeholder g element to the SVG
        // g will contain geometry elements
        const g = svg.append("g");

        // width and height of the whole visualization by
        // setting projection parameters
        const albersProjection = d3.geoAlbers()
            .scale(82000)
            .rotate([87.6298, 0])
            .center([0, 41.8781])
        // .translate( [width, height] );

        // create GeoPath function that uses built-in D3 functionality to turn
        // lat/lon coordinates into screen coordinates (i.e. path generator)
        const geoPath = d3.geoPath()
            .projection(albersProjection);

        // Select non-existent elements, bind the data, append the elements, and apply attributes
        g.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "#ccc")
            .attr("stroke", "#333")
            .attr("d", geoPath);

        if (input === 'zipcodes') {
            g.selectAll("path")
                .on("mouseover", function(d){
                    d3.select("h2").text("Zip Code: "+d.properties.zip);
                    d3.select(this).attr("class", "highlight");
                })
                .on("mouseout", function(d){
                    d3.select("h2").text("Zip Code: ");
                    d3.select(this).attr("class", "blank");
                })
        }

        else if (input === 'districts') {
            g.selectAll("path")
                .on("mouseover", function(d){
                    d3.select("h2").text("District: "+d.properties.DISTRICT);
                    d3.select(this).attr("class", "highlight");
                })
                .on("mouseout", function(d){
                    d3.select("h2").text("District: ");
                    d3.select(this).attr("class", "blank");
                })
        }

        else if (input === 'beats') {
            g.selectAll("path")
                .on("mouseover", function(d){
                    d3.select("h2").text("Beat No: "+d.properties.BEAT_NO);
                    d3.select(this).attr("class", "highlight");
                })
                .on("mouseout", function(d){
                    d3.select("h2").text("Beat No: ");
                    d3.select(this).attr("class", "blank");
                })
        }

        else if (input === 'sectors') {
            g.selectAll("path")
                .on("mouseover", function(d){
                    d3.select("h2").text("Sector: "+d.properties.SECTOR_NO);
                    d3.select(this).attr("class", "highlight");
                })
                .on("mouseout", function(d){
                    d3.select("h2").text("Sector: ");
                    d3.select(this).attr("class", "blank");
                })
        }


    });

    console.log('process completed, map should show up')
    return "hello world";
};


