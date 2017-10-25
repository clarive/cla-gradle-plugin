
# Gradle plugin

Gradle plugin will allow you to launch Gradle commands to build your projects from a Clarive instance.

## What is Gradle

Gradle is an open source build automation system that builds upon the concepts of Apache Ant and Apache Maven and introduces a Groovy-based domain-specific language. Gradle uses a directed acyclic graph ("DAG") to determine the order in which tasks can be run.

## Requirements

[Gradle](https://gradle.org/) is needed in order for it to work properly.

## Installation

To install the plugin, place the cla-gradle-plugin folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to use

Once the plugin is correctly installed and the Clarive instance is restarted, you will have a new palette service called 'Gradle compile'.

### Gradle compile service:

This palette service will let you choose the option that you wish to perform with Gradle.
The various parameters from the palette service are:

- **Server** - Choose the server where you wish to execute the command.
- **Gradle path** - Full path to the Gradle executable location. If it is in the system path, you can leave it empty.
- **Project path** - Full path to the project location that will be built.
- **Command** - Here you will have different commands to launch with the service or write a custom one.
    - **Compile release** - Will build the project with the AssembleRelease configuration.
    - **Compile debug** - Will build the project with the AssembleDebug configuration.
    - **Custom** - Will get the commands writen in the **Custom command or arguments** box.
- **Custom command or arguments** - Here you can write arguments for the selected command or write the commands you want to perform.
- **Errors and output** - These two fields are related to manage control errors. Options are:
   - **Fail and output error** - Search for configurated error pattern in script output. If found, an error message is displayed in monitor showing the match.
   - **Warn and output warn** - Search for configurated warning pattern in script output. If found, an error message is displayed in monitor showing the match.
   - **Custom** - In case combo box errors is set to custom a new form is showed to define the behavior with these fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in monitor.
   - **Warn** - Range of return code values to warn the user. A warn message will be displayed in monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in monitor.


Configuration example:

    Server: Gradle-Server
    Gradle path: C:\programs\gradle\gradle.bat
    Project path: C:\projects\build-project\
    Command: AssembleRelease
    Custom command or arguments:
    Errors: fail

The service will return the console output for the command.

