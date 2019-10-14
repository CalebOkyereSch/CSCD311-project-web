const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const authenticateUser=(id,password,done)=>{

	const student= getUserById(id)
	if(user == null){
		return done(null,false,{message:'No user with that email'})
	}

	try{
		if(await bcrypt.compare(password,student.password)){
				return done(null,student)
		}
		else{
			return done(null,false,{message:'Password Incorrect'})
		}

	} catch(err){

	   return done(err)

	}
}


function initialize(passport){
	passport.use(new LocalStrategy({usernameField:'id'}),
		authenticateUser)
	passport.serializeUser((student,done)=>{

	})
	passport.deserializeUser((student,done)=>{

	})
}