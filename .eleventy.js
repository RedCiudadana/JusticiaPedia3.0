const rmj = require('render-markdown-js')
const moment = require('moment'); 

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('elementos');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('images');

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

    eleventyConfig.addFilter("filtrarPorInstitucion", function(coleccion, id) {
        if (!coleccion || !id) {
            return [];
        }
        return coleccion.filter(item => item.data.perfiles.institution === id);
    });

    eleventyConfig.addFilter("filtrarPorEleccionI", function(coleccion, id) {
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
}
