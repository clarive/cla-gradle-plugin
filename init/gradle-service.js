var reg = require("cla/reg");

reg.register('service.gradle.task', {
    name: _('Gradle compile'),
    icon: '/plugin/cla-gradle-plugin/icon/gradle.svg',
    form: '/plugin/cla-gradle-plugin/form/gradle-service-form.js',
    rulebook: {
        moniker: 'gradle_compile',
        description: _('Executes a Gradle compilation'),
        required: ['server', 'project_path', 'command'],
        allow: ['server', 'project_path', 'command', 'gradle_path', 'user', 'custom_args', 'errors'],
        mapper: {
            'project_path':'appPath',
            'custom_args': 'custom',
            'gradle_path': 'gradlePath'
        },
        examples: [{
            gradle_compile: {
                server: 'gradle_server',
                user: 'clarive_user',
                gradle_path: "C:\programs\gradle\gradle.bat",
                project_path: "C:\projects\build-project",
                command: "custom",
                custom_args:["AssembleRelease"] ,
                errors: "fail"
            }
        }]
    },
    handler: function(ctx, params) {

        var reg = require('cla/reg');
        var fs = require('cla/fs');
        var log = require('cla/log');

        var server = params.gradleServer;
        var appPath = params.appPath || "";
        var gradlePath = params.gradlePath;
        var errors = params.errors || 'fail';
        var command = params.command || "";
        var customParams = params.custom || [];
        var fullCommand = "";
        var user = params.user || "";

        if (server == "") {
            log.fatal(_("No server selected"));
        }

        function remoteCommand(params, command, server, errors, user) {
            var output = reg.launch('service.scripting.remote', {
                name: _('Gradle task'),
                config: {
                    errors: errors,
                    server: server,
                    user: user,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        var gradleCommand;
        if (gradlePath == '') {
            gradleCommand = "gradle ";
        } else {
            gradleCommand = gradlePath + " ";
        }

        if (command == "custom") {
            fullCommand = "cd " + appPath + " && " + gradleCommand + customParams.join(" ");
        } else if (command == "") {
            log.fatal(_("No option selected"));
        } else {
            fullCommand = "cd " + appPath + " && " + gradleCommand + command + " " + customParams.join(" ");
        }

        log.info(_("Starting Gradle task"));
        var response = remoteCommand(params, fullCommand, server, errors, user);
        log.info(_("Gradle task finished"));
        return response.output;
    }
});