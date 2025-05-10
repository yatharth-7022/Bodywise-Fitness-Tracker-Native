"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create exercises
        const createdExercises = yield Promise.all([
            // Chest Exercises
            prisma.exercise.create({
                data: {
                    name: "Barbell Bench Press",
                    description: "A compound exercise that targets the chest, shoulders, and triceps. Lie on a bench and press a barbell upward from your chest.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/bench-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Dumbbell Fly",
                    description: "An isolation exercise that targets the chest muscles. Lie on a bench and move dumbbells in an arc motion.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/chest-fly.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=eozdVDA78K0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Incline Dumbbell Press",
                    description: "A variation of the bench press that targets the upper chest. Performed on an inclined bench with dumbbells.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/incline-dumbbell-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=5CECBjd7HLQ",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Crossover",
                    description: "An isolation exercise that targets the chest muscles using cable machines. Provides constant tension throughout the movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/cable-crossover.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=Iwe6AmxVf7o",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Push-ups",
                    description: "A bodyweight exercise that targets the chest, shoulders, and triceps. Can be modified for different difficulty levels.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/push-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=WDIpL0pjun0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Decline Dumbbell Bench Press",
                    description: "A variation of the bench press that targets the lower chest. Performed on a declined bench.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/decline-bench-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=0xRvl4Qv3ZY",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Pec Deck Machine",
                    description: "An isolation exercise that targets the chest muscles using a machine. Provides controlled movement and stability.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/pec-deck.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=sAeDw6xhFFw",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Machine Chest Press",
                    description: "A compound exercise that targets the chest muscles using a machine. Provides stability and controlled movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/machine-chest-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=vnd-GBtTMLI",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Incline Cable Fly",
                    description: "An isolation exercise that targets the upper chest using cable machines. Provides constant tension throughout the movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/incline-chest-fly.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=e_8HLu59-to",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Landmine Press",
                    description: "A compound exercise that targets the chest and shoulders using a barbell anchored in a landmine attachment.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/landmine-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=t9GuiNQo1O4",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Svend Press",
                    description: "An isolation exercise that targets the chest muscles using weight plates. Focuses on the inner chest.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/svend-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=cIoUZOnypS8",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Floor Press",
                    description: "A variation of the bench press performed on the floor. Limits range of motion and focuses on the upper portion of the press.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/floor-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=T0Y3OBF1bNI",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Smith Machine Bench Press",
                    description: "A variation of the bench press using a Smith machine. Provides stability and controlled movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/smith-bench-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=O5viuEPDXKY",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Incline Machine Press",
                    description: "A variation of the bench press using a machine. Provides stability and controlled movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/incline-machine-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=tiWPSwt8_zM",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Explosive Push-ups",
                    description: "A variation of push-ups that focuses on explosive power. Can be modified for different difficulty levels.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/explosive-push-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=CvgV8W98inA",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Band Push-ups",
                    description: "A variation of push-ups using resistance bands. Provides variable resistance throughout the movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/band-push-ups.jpg",
                    videoUrl: "https://www.youtube.com/embed/5v3rYbbZf2o",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Chest Dips",
                    description: "A compound exercise that targets the chest, shoulders, and triceps. Can be performed using parallel bars or a dip machine.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/chest-dips.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=cz6IAayKzNA",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Isometric Chest Squeeze",
                    description: "An isolation exercise that targets the chest muscles. Focuses on the contraction phase of the movement.",
                    bodyPart: "Chest",
                    imageUrl: "/exercises/isometric-chest-squeeze.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=anxpxp0rbHs",
                },
            }),
            // Shoulder Exercises
            prisma.exercise.create({
                data: {
                    name: "Overhead Press",
                    description: "A compound exercise that targets the shoulders and triceps. Press a barbell or dumbbells overhead while standing or seated.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/overhead-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=F3QY5vMz_6I",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Lateral Raises",
                    description: "An isolation exercise that targets the side deltoids. Raise dumbbells or cables to the sides while keeping arms straight.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/lateral-raises.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=OuG1smZTsQQ",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Front Raises",
                    description: "An isolation exercise that targets the front deltoids. Raise dumbbells or a barbell in front of the body.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/front-raises.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=hRJ6tR5-if0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Face Pulls",
                    description: "An exercise that targets the rear deltoids and upper back. Pull a cable attachment towards the face while keeping elbows high.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/face-pulls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=-MODnZdnmAQ",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Arnold Press",
                    description: "A variation of the overhead press that targets all three heads of the deltoids. Rotate the dumbbells during the movement.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/arnold-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=6Z15_WdXmVw",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Rear Delt Fly",
                    description: "An isolation exercise that targets the rear deltoids. Move dumbbells or cables in an arc motion while keeping arms straight.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/rear-delt-fly.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=d_feFQGGVh4",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Lateral Raise",
                    description: "An isolation exercise that targets the side deltoids using cable machines. Provides constant tension throughout the movement.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/cable-lateral-raise.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=lq7eLC30b9w",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Standing Military Press",
                    description: "A compound exercise that targets the shoulders and triceps. Press a barbell overhead while standing.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/standing-military-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=G2qpTG1Eh40",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Upright Row",
                    description: "A compound exercise that targets the shoulders and upper back. Pull a barbell or dumbbells up towards the chin.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/upright-row.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=um3VVzqunPU",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Shrugs",
                    description: "An isolation exercise that targets the trapezius muscles. Raise the shoulders towards the ears.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/shrugs.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=_t3lrPI6Ns4",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Reverse Pec Deck",
                    description: "An isolation exercise that targets the rear deltoids using a machine. Provides controlled movement and stability.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/reverse-pec-deck.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=5YK4bgzXDp0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Z-Press",
                    description: "A variation of the overhead press that targets the shoulders and core. Performed while sitting on the floor.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/z-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=0fHdnBH9Gdo",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Rear Delt Row",
                    description: "A compound exercise that targets the rear deltoids and upper back. Row a barbell or dumbbells towards the torso.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/rear-delt-row.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=t-llLcNvsro",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Y-Raises",
                    description: "An isolation exercise that targets the upper back and rear deltoids. Raise dumbbells in a Y-shape.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/y-raises.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=U7Pdw5wFGh0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Machine Shoulder Press",
                    description: "A compound exercise that targets the shoulders using a machine. Provides stability and controlled movement.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/machine-shoulder-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=MjVDrYPD7Rs",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Single Arm Press",
                    description: "A unilateral exercise that targets the shoulders. Helps address muscle imbalances.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/single-arm-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=FUwme_oBDsA",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Front Plate Raise",
                    description: "An isolation exercise that targets the front deltoids. Raise a weight plate in front of the body.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/front-plate-raise.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=FbkDVvHKrgE",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Handstand Push-ups",
                    description: "A bodyweight exercise that targets the shoulders and triceps. Performed in a handstand position.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/handstand-push-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=pYx7CRs7kAM",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Clean and Press",
                    description: "A compound exercise that targets the shoulders, legs, and core. Clean a barbell from the ground and press it overhead.",
                    bodyPart: "Shoulders",
                    imageUrl: "/exercises/clean-and-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=K1QPQBVbTKM",
                },
            }),
            // Leg Exercises
            prisma.exercise.create({
                data: {
                    name: "Barbell Squats",
                    description: "A compound exercise that targets the quadriceps, hamstrings, and glutes. Lower the body by bending the knees and hips.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/squats.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=MVMNk0HiTMg",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Deadlifts",
                    description: "A compound exercise that targets the posterior chain. Lift a barbell from the ground to a standing position.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/deadlifts.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=AweC3UaM14o",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Lunges",
                    description: "A compound exercise that targets the quadriceps, hamstrings, and glutes. Step forward and lower the body until both knees are bent.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/lunges.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=9gglI77Kzq8",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Leg Press",
                    description: "A compound exercise that targets the quadriceps, hamstrings, and glutes. Press a weighted platform away from the body using the legs.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/leg-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=yZmx_Ac3880",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Romanian Deadlifts",
                    description: "A compound exercise that targets the hamstrings and glutes. Hinge at the hips while keeping the back straight.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/romanian-deadlifts.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=8tTKm-3wX5s",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Leg Extensions",
                    description: "An isolation exercise that targets the quadriceps using a machine. Provides controlled movement and stability.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/leg-extensions.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=m0FOpMEgero",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Leg Curls",
                    description: "An isolation exercise that targets the hamstrings using a machine. Provides controlled movement and stability.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/leg-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=Orxowest56U",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Hack Squats",
                    description: "A compound exercise that targets the quadriceps, hamstrings, and glutes. Performed on a hack squat machine.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/hack-squats.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=rYgNArpwE7E",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Sumo Deadlifts",
                    description: "A variation of the deadlift that targets the inner thighs and glutes. Performed with a wide stance.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/sumo-deadlifts.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=pfSMst14EFk",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Walking Lunges",
                    description: "A variation of lunges that targets the quadriceps, hamstrings, and glutes. Performed while walking forward.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/walking-lunges.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=DlhojghkaQ0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Glute Bridges",
                    description: "An isolation exercise that targets the glutes. Lift the hips off the ground while lying on the back.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/glute-bridges.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=OUgsJ8-Vi0E",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Hip Thrusts",
                    description: "An isolation exercise that targets the glutes. Lift the hips off the ground while resting the upper back on a bench.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/hip-thrusts.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=pUdIL5x0fWg",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Dumbbell Step-up",
                    description: "A compound exercise that targets the quadriceps, hamstrings, and glutes. Step up onto a platform and back down.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/step-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=DxUNi119Qzs",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Goblet Squats",
                    description: "A variation of squats that targets the quadriceps, hamstrings, and glutes. Hold a dumbbell or kettlebell at chest level.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/goblet-squats.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=3gpXflqRiEc",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Box Jumps",
                    description: "A plyometric exercise that targets the legs and core. Jump onto a box or platform.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/box-jumps.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=HHX_8rNIrYE",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Sissy Squats",
                    description: "A variation of squats that targets the quadriceps. Lean back while keeping the torso upright.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/sissy-squats.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=FTmbNjUu7CI",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Bulgarian Split Squats",
                    description: "A unilateral exercise that targets the quadriceps, hamstrings, and glutes. Performed with one foot elevated on a bench.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/bulgarian-split-squats.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=Fmjj7wFJWRE",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Single Leg Single Kettlebell Deadlift",
                    description: "A unilateral exercise that targets the hamstrings and glutes. Hinge at the hips while keeping one leg off the ground.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/single-leg-deadlifts.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=VnHvZtV8Gz0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Calf Raises",
                    description: "An isolation exercise that targets the calf muscles. Raise the heels off the ground while standing.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/calf-raises.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=c5Kv6-fnTj8",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Donkey Kicks",
                    description: "An isolation exercise that targets the glutes. Kick one leg back while keeping the knee bent.",
                    bodyPart: "Legs",
                    imageUrl: "/exercises/donkey-kicks.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=EtSJ8rwm5M8",
                },
            }),
            // Arm Exercises
            prisma.exercise.create({
                data: {
                    name: "Bicep Curls",
                    description: "An isolation exercise that targets the biceps. Curl a dumbbell or barbell towards the shoulders.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/bicep-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=HnHuhf4hEWY",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Overhead Triceps Extension",
                    description: "An isolation exercise that targets the triceps. Extend the arms overhead or behind the body with a dumbbell or cable.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/tricep-extensions.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=1u18yJELsh0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Hammer Curls",
                    description: "An isolation exercise that targets the biceps and brachialis. Curl dumbbells with a neutral grip.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/hammer-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=BRVDS6HVR9Q",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Barbell Skull Crushers",
                    description: "An isolation exercise that targets the triceps. Lower a barbell or dumbbells towards the forehead while lying on a bench.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/skull-crushers.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=l3rHYPtMUo8",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Preacher Curls",
                    description: "An isolation exercise that targets the biceps. Curl a barbell or dumbbells while resting the arms on a preacher bench.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/preacher-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=sxA__DoLsgo",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Bicep Curls",
                    description: "An isolation exercise that targets the biceps using cable machines. Provides constant tension throughout the movement.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/cable-bicep-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=UsaY33N4KEw",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Tricep Pushdowns",
                    description: "An isolation exercise that targets the triceps using cable machines. Push the cable attachment down while keeping elbows stationary.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/cable-tricep-pushdowns.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=6Fzep104f0s",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Concentration Curls",
                    description: "An isolation exercise that targets the biceps. Curl a dumbbell while resting the elbow on the inner thigh.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/concentration-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=VMbDQ8PZazY",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Overhead Tricep Extensions",
                    description: "An isolation exercise that targets the triceps. Extend the arms overhead with a dumbbell or cable.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/overhead-tricep-extensions.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=1u18yJELsh0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Zottman Curls",
                    description: "An isolation exercise that targets the biceps and forearms. Rotate the dumbbells during the curl movement.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/zottman-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=wrjEdVZrkhk",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Tricep Dips",
                    description: "A compound exercise that targets the triceps and chest. Lower and raise the body using parallel bars.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/dips.jpg",
                    videoUrl: "https://www.youtube.com/shorts/9llvBAV4RHI",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Close Grip Bench Press",
                    description: "A compound exercise that targets the triceps and chest. Press a barbell with hands closer than shoulder width.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/close-grip-bench-press.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=XEFDMwmrLAM",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Reverse Curls",
                    description: "An isolation exercise that targets the brachialis and forearms. Curl a barbell or dumbbells with an overhand grip.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/reverse-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=hUA-fIpM7nA",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Tricep Kickbacks",
                    description: "An isolation exercise that targets the triceps. Extend the arm backward while keeping the upper arm parallel to the floor.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/tricep-kickbacks.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=m_UlDFNX4mk",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Wrist Curls",
                    description: "An isolation exercise that targets the forearms. Curl a barbell or dumbbells using only wrist movement.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/wrist-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=3VLTzIrnb5g",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Reverse Wrist Curls",
                    description: "An isolation exercise that targets the forearms. Curl a barbell or dumbbells with an overhand grip using only wrist movement.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/reverse-wrist-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=FW7URAaC-vE",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Hammer Curls",
                    description: "An isolation exercise that targets the biceps and brachialis using cable machines. Provides constant tension throughout the movement.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/cable-hammer-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=V8AR3SGzboU",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Single Arm Tricep Extensions",
                    description: "An isolation exercise that targets the triceps. Extend one arm overhead with a dumbbell or cable.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/single-arm-tricep-extensions.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=vjOefY0qd1Y",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "EZ Bar Curls",
                    description: "An isolation exercise that targets the biceps. Curl an EZ bar towards the shoulders.",
                    bodyPart: "Arms",
                    imageUrl: "/exercises/ez-bar-curls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=EK747VC37yE",
                },
            }),
            // Back Exercises
            prisma.exercise.create({
                data: {
                    name: "Pull-ups",
                    description: "A compound exercise that targets the back and biceps. Pull the body up to a bar using the arms.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/pull-ups.jpg",
                    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Bent Over Rows",
                    description: "A compound exercise that targets the back and biceps. Row a barbell or dumbbells towards the torso while bent over.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/bent-over-rows.jpg",
                    videoUrl: "https://www.youtube.com/embed/9EGD1nZ6jLQ",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Lat Pulldowns",
                    description: "A compound exercise that targets the latissimus dorsi. Pull a bar down towards the chest while seated.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/lat-pulldowns.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=JGeRYIZdojU",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "T-Bar Rows",
                    description: "A compound exercise that targets the back and biceps. Row a T-bar towards the torso while standing.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/t-bar-rows.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=hYo72r8Ivso",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Seated Cable Rows",
                    description: "A compound exercise that targets the back and biceps. Row a cable attachment towards the torso while seated.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/seated-cable-rows.jpg",
                    videoUrl: "https://www.youtube.com/shorts/qD1WZ5pSuvk",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Single Arm Dumbbell Rows",
                    description: "A unilateral exercise that targets the back and biceps. Row a dumbbell towards the torso while supporting the body with one hand.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/single-arm-dumbbell-rows.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=DMo3HJoawrU",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Chin-ups",
                    description: "A compound exercise that targets the back and biceps. Pull the body up to a bar using an underhand grip.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/chin-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=T78xCiw_R6g",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Meadows Rows",
                    description: "A compound exercise that targets the back and biceps. Row a barbell anchored in a landmine attachment.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/meadows-rows.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=G-jU1aPVhnY",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Pullovers",
                    description: "An isolation exercise that targets the latissimus dorsi. Pull a cable attachment down and back while keeping arms straight.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/cable-pullovers.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=gxOwRCbkcqw",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Reverse Fly",
                    description: "An isolation exercise that targets the rear deltoids and upper back. Move dumbbells or cables in an arc motion while keeping arms straight.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/reverse-fly.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=IloCYmYWayM",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Barbell Shrugs",
                    description: "An isolation exercise that targets the trapezius muscles. Raise the shoulders towards the ears while holding a barbell.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/barbell-shrugs.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=M_MjF5Nm_h4",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Wide Grip Pull-ups",
                    description: "A compound exercise that targets the back and biceps. Pull the body up to a bar using a wide grip.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/wide-grip-pull-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=GRgWPT9XSQQ",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Close Grip Pull-ups",
                    description: "A compound exercise that targets the back and biceps. Pull the body up to a bar using a close grip.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/close-grip-pull-ups.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=aAggnpPyR6E",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Machine Chest Supported Row",
                    description: "A compound exercise that targets the back and biceps using a machine. Provides stability and controlled movement.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/machine-rows.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=_FrrYQxA6kc",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Inverted Rows",
                    description: "A compound exercise that targets the back and biceps. Row the body up to a bar while lying underneath it.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/inverted-rows.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=KOaCM1HMwU0",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Straight Arm Pulldowns",
                    description: "An isolation exercise that targets the latissimus dorsi. Pull a cable attachment down while keeping arms straight.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/straight-arm-pulldowns.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=G9uNaXGTJ4w",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Good Mornings",
                    description: "A compound exercise that targets the lower back and hamstrings. Hinge at the hips while keeping the back straight.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/good-mornings.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=dEJ0FTm-CEk",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Hyperextensions",
                    description: "An isolation exercise that targets the lower back. Extend the torso up while lying face down on a hyperextension bench.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/hyperextensions.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=5_ejbGfdAQE",
                },
            }),
            prisma.exercise.create({
                data: {
                    name: "Cable Face Pulls",
                    description: "An exercise that targets the rear deltoids and upper back. Pull a cable attachment towards the face while keeping elbows high.",
                    bodyPart: "Back",
                    imageUrl: "/exercises/cable-face-pulls.jpg",
                    videoUrl: "https://www.youtube.com/watch?v=-MODnZdnmAQ",
                },
            }),
        ]);
        // Create default routines
        yield Promise.all([
            prisma.routine.create({
                data: {
                    name: "Chest Day",
                    description: "A comprehensive chest workout routine",
                    imageUrl: "/Routines/chest-workout.jpg",
                    duration: 45 * 60,
                    isDefault: true,
                    exercises: {
                        create: [
                            {
                                exerciseId: createdExercises[2].id,
                                sets: 4,
                                exerciseSets: {
                                    create: Array.from({ length: 4 }).map(() => ({
                                        weight: 0,
                                        reps: 8,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[3].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 10,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[4].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[7].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 15,
                                        isCompleted: false,
                                    })),
                                },
                            },
                        ],
                    },
                },
            }),
            prisma.routine.create({
                data: {
                    name: "Shoulder Day",
                    description: "A complete shoulder workout routine",
                    imageUrl: "/Routines/shoulder-workout.jpg",
                    duration: 40 * 60,
                    isDefault: true,
                    exercises: {
                        create: [
                            {
                                exerciseId: createdExercises[20].id,
                                sets: 4,
                                exerciseSets: {
                                    create: Array.from({ length: 4 }).map(() => ({
                                        weight: 0,
                                        reps: 8,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[21].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[22].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[23].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 15,
                                        isCompleted: false,
                                    })),
                                },
                            },
                        ],
                    },
                },
            }),
            prisma.routine.create({
                data: {
                    name: "Leg Day",
                    description: "A challenging leg workout routine",
                    imageUrl: "/Routines/leg-workout.jpg",
                    duration: 50 * 60, // 50 minutes in seconds
                    isDefault: true,
                    exercises: {
                        create: [
                            {
                                exerciseId: createdExercises[37].id,
                                sets: 4,
                                exerciseSets: {
                                    create: Array.from({ length: 4 }).map(() => ({
                                        weight: 0,
                                        reps: 8,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[42].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 6,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[43].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 10,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[41].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                        ],
                    },
                },
            }),
            prisma.routine.create({
                data: {
                    name: "Arm Day",
                    description: "An intense arm workout routine",
                    imageUrl: "/Routines/arm-workout.jpg",
                    duration: 35 * 60,
                    isDefault: true,
                    exercises: {
                        create: [
                            {
                                exerciseId: createdExercises[57].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[58].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[59].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[63].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 12,
                                        isCompleted: false,
                                    })),
                                },
                            },
                        ],
                    },
                },
            }),
            prisma.routine.create({
                data: {
                    name: "Back Day",
                    description: "A complete back workout routine",
                    imageUrl: "/Routines/back-workout.jpg",
                    duration: 45 * 60, // 45 minutes in seconds
                    isDefault: true,
                    exercises: {
                        create: [
                            {
                                exerciseId: createdExercises[91].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 8,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[75].id,
                                sets: 4,
                                exerciseSets: {
                                    create: Array.from({ length: 4 }).map(() => ({
                                        weight: 0,
                                        reps: 8,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[77].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 10,
                                        isCompleted: false,
                                    })),
                                },
                            },
                            {
                                exerciseId: createdExercises[76].id,
                                sets: 3,
                                exerciseSets: {
                                    create: Array.from({ length: 3 }).map(() => ({
                                        weight: 0,
                                        reps: 10,
                                        isCompleted: false,
                                    })),
                                },
                            },
                        ],
                    },
                },
            }),
        ]);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
