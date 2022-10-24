const { sequelize } = require("../db/models");

const roleService = require("../services/RoleService");

const ReqValidator = require("../utils/validator");

exports.createRole = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };
    await roleService.createRole(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new role has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getRoles();
    res.status(200).json(roles);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };

    const roleId = req.params.id;

    const role = await roleService.getRole(roleId);

    if (!role) {
      await transaction.commit();
      return res
        .status(200)
        .json({ message: `Role ${roleId} does not exist in our database` });
    }

    await roleService.updateRole(
      data,
      {
        where: {
          id: roleId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({ data, message: `Role ${roleId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteRole = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const roleId = req.params.id;

    const role = await roleService.getRole(roleId);

    if (!role) {
      await transaction.commit();
      return res
        .status(200)
        .json({ message: `Role ${roleId} does not exist in our database` });
    }

    await roleService.deleteRole(
      {
        where: {
          id: roleId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Role ${roleId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
