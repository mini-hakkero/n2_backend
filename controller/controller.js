const {conn} = require('../config/connection.js')

let jornalController = {}

jornalController.all = function (req, res) {
    try {
        conn.query('SELECT * FROM assinante', function (err, results) {
            if (err) {
                console.log('Erro!', err);
                res.status(500).json({ error: 'Erro no servidor' });
                return;
            }

            const assinaturas = results;
            res.status(200).json(assinaturas);
        });
    } catch (e) {
        console.log('Erro: All', e);
    }
};

jornalController.busca = function (req, res){
    try {
    const nome = req.params.nome;
    const sql = "SELECT * FROM assinante where nome_assinante = ?;";
    const values = [nome];

    conn.query(sql, values,function (err, results) {
            if (err) {
              console.log("Erro: ", err);
              res.status(500).json({ error: "Erro no servidor." });
              return;
            }
            res.json(results);
          });
    } catch (e) {
        console.log("Erro: ", e);
        res.status(500).json({ error: "Nome não encontrado." });
    }
};

jornalController.create = function (req, res) {
    try {
        const jornalData = req.body;
        const sql = 'INSERT INTO assinante (cpf_assinante, nome_assinante, email_assinante) VALUES (?, ?, ?)';
        const values = [jornalData.cpf_assinante, jornalData.nome_assinante, jornalData.email_assinante];
        
        conn.query(sql, values, function (err, result) {
            if (err) {
                console.log('Erro: Create', err);
                res.status(500).json({ error: 'Erro no servidor' });
                return;
            }

            res.status(201).json({
                status: 'Inserção efetuada com sucesso!',
                result: result,
            });
        });
    } catch (e) {
        console.log('Erro: Create', e);
    }
};

jornalController.update = function (req, res) {
    try {
        let cpf = req.params.cpf_assinante
        let jornalData = req.body
        let sql = "UPDATE assinante SET nome_assinante=?, email_assinante=? WHERE cpf_assinante=?;"
        let values = [jornalData.nome_assinante, jornalData.email_assinante, cpf]
        let result = conn.query(sql, values)
        res.send({
            status:"Atualização do assinante " + jornalData.nome_assinante + "realizada com sucesso!",
            result: result
        })
    } catch (e) {
        console.log("Erro: Update", e)

    }
}

jornalController.delete = function (req, res) {
    try {
        let cpf = req.params.cpf_assinante
        let sql = "DELETE FROM assinante WHERE cpf_assinante=?;"
        let result = conn.query(sql, [cpf])
        res.send({
            status:"CPF " + cpf + " cancelado com sucesso!",
            result: result
        })
    } catch (e) {
        console.log("Erro: Delete", e)

    }
}
module.exports = {jornalController}

