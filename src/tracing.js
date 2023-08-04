var functionLogger = {};

functionLogger.log = true;//Set this to false to disable logging 


functionLogger.getLoggableFunction = function(func, name) {
    return function() {
        if (functionLogger.log) {
            var logText = name + '(';

            for (var i = 0; i < arguments.length; i++) {
                if (i > 0) {
                    logText += ', ';
                }
                logText += arguments[i];
            }
            logText += ');';

            console.log(logText);
        }

        return func.apply(this, arguments);
    }
};


functionLogger.addLoggingToNamespace = function(namespaceObject){
    for(var name in namespaceObject){
        var potentialFunction = namespaceObject[name];

        if(Object.prototype.toString.call(potentialFunction) === '[object Function]'){
            namespaceObject[name] = functionLogger.getLoggableFunction(potentialFunction, name);
        }
    }
};

export default functionLogger
