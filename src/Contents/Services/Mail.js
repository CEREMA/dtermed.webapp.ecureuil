process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
Mail = {
	send: function (o, cb) {
		var nodemailer = Mail.using('nodemailer');
		var smtpTransport = Mail.using('nodemailer-smtp-transport');
		var options = {
			port: 25,
			host: "smtp.melanie2.i2",
			requireTLS: true,
			secure: false,
			debug: true,
			tls: {
				rejectUnauthorized: false
			}
		};
		var transporter = nodemailer.createTransport(smtpTransport(options))
		console.log(o);
		transporter.sendMail({
			from: "robot-aix.sii.sg.dtermed@cete-mediterranee.i2",
			to: o.to,
			subject: o.subject,
			text: o.text
		}, function (err, result) {
			console.log(err);
			console.log(result);
			cb(err, result);
		});

	}
};

module.exports = Mail