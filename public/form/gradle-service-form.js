(function(params) {

    var data = params.data;

    var gradleServerCombo = Cla.ui.ciCombo({
        name: 'gradleServer',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.gradleServer || '',
        allowBlank: false,
        with_vars: 1
    });

    var gradlePathTextField = Cla.ui.textField({
        name: 'gradlePath',
        fieldLabel: _('Gradle path'),
        value: params.data.gradlePath || '',
    });

    var appPathTextField = Cla.ui.textField({
        name: 'appPath',
        fieldLabel: _('Project path'),
        value: params.data.appPath || '',
        allowBlank: false
    });

    var commandComboBox = Cla.ui.comboBox({
        name: 'command',
        fieldLabel: _('Command'),
        data: [
            ['assembleRelease',_('Compile Release')],
            ['assembleDebug',_('Compile Debug')],
            ['custom',_('Custom command')]
        ],
        value: data.command || 'assembleRelease',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var customParams = Cla.ui.arrayGrid({
            fieldLabel: _('Custom commands or arguments'),
            name: 'custom',
            value: data.custom,
            description: _('Custom commands or arguments'),
            default_value: '.'
    });


    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: data.rcError,
        errorTabsValue: data
    })

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            gradleServerCombo,
            gradlePathTextField,
            appPathTextField,
            commandComboBox,
            customParams,
            errorBox
        ]
    });

    return panel;
})