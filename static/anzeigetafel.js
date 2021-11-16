    $(document).ready(function () {
        var socket = io.connect('http://' + document.domain + ':' + location.port);

        $('#publish').click(function (event) {
            var topic = $('#topic').val();
            var message = $('#message').val();
            var qos = 0;
            var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
            socket.emit('publish', data = data);
        });

        $('#publish_mode').click(function (event) {
            var topic = "anzeigetafel/mode";
            var message = $('#message').val();
            var qos = 0;
            var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
            socket.emit('publish', data = data);
        });

        $('#publish_text').click(function (event) {
            for (let i = 1; i < 6; i++) {
                var topic = "anzeigetafel/textline" + i;
                var message = $('#line' + i).val();
                var qos = 0;
                var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
                socket.emit('publish', data = data);
            }
        });

        $('#subscribe').click(function (event) {
            var topic = $('#subscribe_topic').val();
            var qos = $('#subscribe_qos').val();
            var data = '{"topic": "' + topic + '", "qos": ' + qos + '}';
            socket.emit('subscribe', data = data);
            $('#subscribe').hide();
            $('#unsubscribe').show();
            $('#subscribe_topic').prop('readonly', true);
        });

        $('#unsubscribe').click(function (event) {
            socket.emit('unsubscribe_all');
            $('#subscribe').show();
            $('#unsubscribe').hide();
            $('#subscribe_topic').prop('readonly', false);
        });

        socket.on('mqtt_message', function (data) {
            console.log(data);
            var text = '(' + data['topic'] + ' qos: ' + data['qos'] + ') ' + data['payload'];
            var $textarea = $('#subscribe_messages');
            $textarea.val($textarea.val() + text + '\n');
        })
    });