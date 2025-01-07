const rmj = require('render-markdown-js')
const moment = require('moment'); 

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('elementos');
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('download');

    eleventyConfig.addNunjucksFilter("rmj", function(content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitPart", function(array, limit1, limit2) {
        return array.slice(limit1, limit2);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

    eleventyConfig.addFilter("log", function(variable) {
        console.log(variable);
        return variable;
    });

    eleventyConfig.addCollection("filteredmp", function(collection) {
        return collection.getFilteredByTags("comisiones").filter(function(item) {
            return item.data.comisiones && 
                   item.data.comisiones.id === "election-2";
        });
    }); 

    eleventyConfig.addFilter("filtrarPorEleccionBlogs", function(coleccion, election) {
        if (!coleccion || !election) {
            return [];
        }
        return coleccion.filter(item => item.data.tipo_eleccion === election);
    });

    eleventyConfig.addFilter("filtrarPorInstitucion", function(coleccion, id) {
        if (!coleccion || !id) {
            return [];
        }
        return coleccion.filter(item => item.data.perfiles.institution === id);
    });

    eleventyConfig.addFilter("filtrarPorEleccion", function(coleccion, id) {
        if (!coleccion || !id) {
            return [];
        }
        return coleccion.filter(item => item.data.perfiles.election === id);
    });

    eleventyConfig.addFilter("filtrarPorComision", function(coleccion, id) {
        if (!coleccion || !id) {
            return [];
        }
        return coleccion.filter(item => item.data.perfiles.comission === id);
    });

    eleventyConfig.addCollection('podcastsHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('podcasts').filter((item) => {
            return item.data.highlight == true;
        });
    });

    eleventyConfig.addCollection('perfiles_institucionales', (collectionApi) => {
        return collectionApi.getFilteredByTag('perfiles').filter((item) => {
            return item.data.perfiles && 'institution' in item.data.perfiles;
        });
    });

    eleventyConfig.addCollection('perfiles_comisionados', (collectionApi) => {
        return collectionApi.getFilteredByTag('perfiles').filter((item) => {
            return item.data.perfiles && 'comission' in item.data.perfiles;
        });
    });

    eleventyConfig.addCollection('perfiles_candidatos', (collectionApi) => {
        return collectionApi.getFilteredByTag('perfiles').filter((item) => {
            return item.data.perfiles && 'election' in item.data.perfiles;
        });
    });

    eleventyConfig.addCollection('newsHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('novedades').filter((item) => {
            return item.data.highlight == true;
        });
    });
    
}
