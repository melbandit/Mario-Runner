#pragma strict

public var leftLimiter:GameObject;
public var rightLimiter:GameObject;
private var sprite:SpriteRenderer;

public var speed:float = 0.02;

private var direction:int = 1; //1 right -1 left

function Start () {
	sprite = this.GetComponent(SpriteRenderer);
}

function Update () {
	this.transform.position.x += speed * direction;

	if(transform.position.x < leftLimiter.transform.position.x){
		direction = 1;
		sprite.flipX = false;
	} else if(transform.position.x > rightLimiter.transform.position.x){ 
		direction = -1;
		sprite.flipX = true;
	}
}
