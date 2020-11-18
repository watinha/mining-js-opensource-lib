(async () => {
    const fs = require('fs'),
          util = require('util'),
          widgets = ['tooltip', 'tab', 'menu', 'dropdown', 'dialog', 'modal', 'overlay', 'accordion', 'popover', 'popup'],
          csvs = {};

    const report_files = [
        './shoutem-ui/report/report.json',
        './dhtmlx-react-widgets/report/report.json',
        './cuke-ui/report/report.json',
        './zendesk-widgets/report/report.json',
        './amazeui-react/report/report.json',
        './box-ui/report/report.json',
        './ember-widgets/report/report.json',
        './react-ui/report/report.json',
        './uiv/report/report.json',
        './weaveworks/report/report.json',
        './uikit/report/report.json',
        './vant/report/report.json',
        './mineral-ui/report/report.json',
        './pivotal-ui/report/report.json',
        './cmui/report/report.json',
        './livepipe-ui/report/report.json',
        './node_modules/es6-plato/report/report.json',
        './dev-extreme/report/report.json',
        './stream-widgets/report/report.json',
        './frame/report/report.json',
        './litegui/report/report.json',
        './cmv-widgets/report/report.json',
        './circuit-ui/report/report.json',
        './xy-ui/report/report.json',
        './jui-ui/report/report.json',
        './liftmodules-widgets/report/report.json',
        './react-material-ui/report/report.json',
        './lucid/report/report.json',
        './zoltan-widgets/report/report.json',
        './ring-ui/report/report.json',
        './keen-ui/report/report.json',
        './rimble-ui/report/report.json',
        './mumuy-widget/report/report.json',
        './mercadolibre-chico/report/report.json',
        './lulu/report/report.json',
        './reactstrap-widgets/report/report.json',
        './geeky-native-base/report/report.json',
        './wijmo/report/report.json',
        './famous-widgets/report/report.json',
        './kendo-ui/report/report.json',
        './ngx-widgets/report/report.json',
        './lobos-react-ui/report/report.json',
        './jquery-ui/report/report.json',
        './ngx-bootstrap/report/report.json',
        './lonely-widgets/report/report.json',
        './jxlib/report/report.json',
        './jquense-react-widgets/report/report.json',
        './dojo-widgets/report/report.json'
    ];

    for (var i = 0; i < widgets.length; i++) {
        csvs[widgets[i]] = [['project', 'file', 'cyclomatic',
                             'cyclomatic density', 'sLOC logical', 'Manutenability',
                             'Halstead bugs', 'Hastead difficulty', 'Halstead effort',
                             'Halstead volume', 'Halstead vocabulary']]
    };

    for (var i = 0; i < report_files.length; i++) {
        const file = report_files[i],
              json = await util.promisify(fs.readFile)(file),
              data = JSON.parse(json);
        for (var j = 0; j < data.reports.length; j++) {
            const report = data.reports[j];
            for (var k = 0; k < widgets.length; k++) {
                const widget = widgets[k],
                      project = file.match(/\/.*\/report\//)[0].slice(1, -8);
                if (report.info.file.search(new RegExp(widget, 'i')) >= 0) {
                    const complexity = report.complexity.aggregate.complexity,
                          cyclomatic = complexity.cyclomatic,
                          cyclomatic_density = complexity.cyclomaticDensity,
                          sloc_logical = complexity.sloc.logical,
                          manutenability = report.complexity.maintainability,
                          bugs = complexity.halstead.bugs,
                          difficulty = complexity.halstead.difficulty,
                          effort = complexity.halstead.effort,
                          volume = complexity.halstead.volume,
                          vocabulary = complexity.halstead.vocabulary;
                    csvs[widget].push([project, report.info.file, cyclomatic,
                                       cyclomatic_density, sloc_logical, manutenability,
                                       bugs, difficulty, effort,
                                       volume, vocabulary]);
                }
            };
        };
    };

    for (var i = 0; i < widgets.length; i++) {
        const widget = widgets[i],
              report = csvs[widget];
        fs.writeFileSync('./results/' + widget + '.csv', report.map((line) => line.join(';')).join('\n'));
    };

    process.exit(0);
})();
