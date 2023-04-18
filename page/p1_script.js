const mapaFetch_p1 = d3.json('palermo-caba.geojson')
const dataFetch_p1 = d3.dsv(';', 'dataset_seguridad_2020.csv', d3.autoType)

Promise.all([mapaFetch_p1, dataFetch_p1]).then(([barrios, data]) => {
  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: 'black',
        fill: '#1d458f',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        
      }),

      Plot.dot(data.filter(d => d.categoria === 'SEGURIDAD' && d.domicilio_barrio === 'PALERMO'), { // Filtramos los datos solo para el barrio "Belgrano"
        x: 'lon',
        y: 'lat',
        r: 2,
        stroke: 'none',
        fill: 'black',
      }),
      Plot.image(data.filter(d => d.categoria === 'SEGURIDAD' && d.domicilio_barrio === 'PALERMO'), {
        x: 'lon',
        y: 'lat',
        src: './police-car-light-svgrepo-com.svg'
      })
      
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_p1').append(() => chartMap)
})