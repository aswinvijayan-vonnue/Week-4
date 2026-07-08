function validateEmail(email) {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return regex.test(email);
}
function createUser({ name, email, role = "viewer", createdAt = Date.now() }) {
  try {
    const roles = ["viewer", "writer", "admin"];
    if (!name || typeof name !== "string" || name.trim === "")
      throw new Error("Validation failed for name");
    if (!email || typeof email !== "string" || !validateEmail(email))
      throw new Error("invalid email");
    if (!role.includes("viewer")) throw new Error("Not a valid role");
    if (typeof createdAt !== "number" || isNaN(createdAt))
      throw new Error("Error in timestamp");
    return Object.freeze({
      id: crypto.randomUUID(),
      name: name.trim(),
      email,
      role,
      createdAt,
    });
  } catch (err) {
    throw err;
  }
}
const user1 = {
  name: "Akshay",
  email: "akshay@gmail.com",
};
try {
  let val = createUser(user1);
  console.log(val);
  val.name="Sasi";
  console.log(val); //no change in name field
} catch (err) {
  console.log(err.message);
}

class QueryBuilder {
  constructor() {
    /*SELECT * FROM table where name=aswin limit(2) */
    this.query = {
      select: null,
      from: null,
      where: null,
      limit: null,
    };
  }
  from(table) {
    this.query.from = table;
    return this;
  }
  where(condition) {
    this.query.where = condition;
    return this;
  }
  select(fields) {
    this.query.select = fields;
    return this;
  }
  limit(n = 0) {
    if (n > 0) {
      this.query.limit = n;
    }
    return this;
  }
  build() {
    let str = `SELECT ${this.query.select} FROM ${this.query.from} WHERE ${this.query.where}`;
    if (this.query.limit !== null) {
      str += `LIMIT ${this.query.limit};`;
    } else {
      str += ";";
    }
    return str;
  }
}

const queryObj = new QueryBuilder();
const query = queryObj
  .from("employees")
  .where("Department='development' ")
  .select("*")
  .limit(3)
  .build();
console.log(query);
const query1 = queryObj
  .from("students")
  .where("totalMark >= 75")
  .select("Name")
  .limit(50)
  .build();
console.log(query1);

function createNotification({
  type = "warning",
  message = "this is a warning !",
  duration = 5000,
  dismissible = true,
}={}) {
    console.log("Welcome bruh");
    return {
        type,
        message,
        duration,
        dismissible,
        show(){
            console.log(`${this.type} : ${this.message}`);
        }
    }
}
const errorMessage=createNotification({ type: "error", message: "Failed!" });
console.log(errorMessage);
errorMessage.show();
const warningMessage=createNotification();
console.log(warningMessage);
warningMessage.show();