AO = {
	del: function (o, cb) {
		AO.using('db').del('gestionao2', 'appelsoffres', o, cb);
	},
	get: function (o, cb) {
		AO.using('db').model('gestionao2', 'select * from appelsoffres left join sources on appelsoffres.IdSource=sources.IdSource left join consultations on appelsoffres.IdConsultation=consultations.IdConsultation left join departements on appelsoffres.IdDepartement=departements.IdDepartement left join naturesprestations on appelsoffres.IdNaturePrestation=naturesprestations.IdNaturePrestation left join domaine on appelsoffres.IdDomaine=domaine.id_domaine left join thematiques on appelsoffres.IdThematique=thematiques.id_thematique where IdAppelOffre="' + o + '"', cb);
	},
	getXLS: function (o, cb) {
		AO.using('db').model('gestionao2', 'select IdAppelOffre from appelsoffres left join sources on appelsoffres.IdSource=sources.IdSource left join consultations on appelsoffres.IdConsultation=consultations.IdConsultation left join departements on appelsoffres.IdDepartement=departements.IdDepartement left join naturesprestations on appelsoffres.IdNaturePrestation=naturesprestations.IdNaturePrestation left join domaine on appelsoffres.IdDomaine=domaine.id_domaine left join thematiques on appelsoffres.IdThematique=thematiques.id_thematique where IdAppelOffre in ("' + o + '")', cb);

	},
	getAll: function (o, cb) {
		if (!AO.auth) return cb('UNAUTHORIZED', null);
		AO.using('db').model('gestionao2', 'SELECT *,domaine.* FROM (appelsoffres LEFT JOIN domaine ON (domaine.id_domaine = appelsoffres.IdDomaine)) where YEAR(DateParution)>2017 order by DateParution desc', cb);
	},
	getProfil: function (cb) {
		if (!AO.auth) return cb('UNAUTHORIZED', null);
		AO.using('db').query('gestionao2', 'select * from profils where PassportUID="' + AO.auth.mail + '"', cb);
	},
	getAll2: function (o, cb) {
		AO.using('db').model('gestionao2', 'select * from sources', cb);
	},
	getAll3: function (o, cb) {
		AO.using('db').model('gestionao2', 'select IdConsultation, LibLongConsultation reponse from consultations', cb);
	},
	getAll4: function (o, cb) {
		var sql = "select departement_code IdDepartement,concat(departement_code,' - ',departement_nom) departement from departement order by departement_code";
		AO.using('db').model('gestionao2', sql, cb);
	},

	getAll5: function (o, cb) {
		AO.using('db').model('gestionao2', 'select * from naturesprestations', cb);
	},

	getUnites: function (o, cb) {
		if (!AO.auth) return cb('UNAUTHORIZED', null);
		AO.using('db').model('bpclight', 'select * from unites left join melu on melu.Kuni= unites.Kuni where Archive=0', cb);
	},
	getAgents: function (o, cb) {
		if (!AO.auth) return cb('UNAUTHORIZED', null);
		AO.using('db').model('bpclight', 'select distinct agents.Kage,Nom,Prenom,LibMelA from agents left join mela on mela.Kage=agents.Kage where actif=1 and mela.LibMelA like "%cerema.fr" order by nom', cb);
	},
	getDomaines: function (o, cb) {
		AO.using('db').model('gestionao2', 'select * from domaine', cb);
	},
	getThematiques: function (o, cb) {
		if (o.id_domaine)
			AO.using('db').model('gestionao2', 'select * from domaine, thematiques where domaine.id_domaine=thematiques.id_domaine and domaine.id_domaine="' + o.id_domaine + '"', cb);
		else
			AO.using('db').model('gestionao2', 'select * from thematiques', cb);
	},
	viewDoc: function (o, cb) {
		AO.file.reader(o, cb);
	},
	post: function (o, cb) {
		if (!AO.auth) return cb('UNAUTHORIZED', null);
		AO.using('db').post('gestionao2', 'appelsoffres', o, function (r) {
			if (o._BLOB) AO.file.writer(o._BLOB, function (rr) {
				cb(rr);
			});
			else cb(r);
		})
	}
};

module.exports = AO;