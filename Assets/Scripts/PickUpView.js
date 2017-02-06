#pragma strict

private var collected:boolean = false;

private var LC:LevelController;

function Start () {
	var levelControllerGameObject:GameObject = gameObject.Find("Level Controller Game Object"); //find the game object
	LC = levelControllerGameObject.GetComponent("LevelController"); //get script from level controller game object
	Debug.Log(LC);
}

function Update () {
	
}

function OnTriggerEnter2D(other:Collider2D) {
	
	if(collected){
		return;
	}//if already collected, ignore

	if(other.gameObject.tag != "Player"){// if hit by somthing other than the player, ignore
		return;
	}
	LC.changeScore(1);

	collected = true;
	Debug.Log("You Win!");

	Destroy(gameObject, 0.1); //distroys the coin and then waits to 
}
