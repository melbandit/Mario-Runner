#pragma strict

private var rb:Rigidbody2D;
private var animController:Animator; //animatino controller to get the jump
private var sprite:SpriteRenderer;
private var alreadyJumped:boolean = false;
//private var leftLimiter:GameObject;
//private var rightLimiter:GameObject;

public var jumpHeight:int = 10;
public var acceleration:float = 0.1;
public var startSpeed:float = 2;
public var maxSpeed:float = 5;


function Start () {
//change the players position
	rb = gameObject.GetComponent(Rigidbody2D);
	//leftLimiter = gameObject.GetComponent(Rigidbody2D);
	//Debug.Log("Hate this headache");
	//rb.velocity.x = startSpeed;
	animController = this.GetComponent(Animator);
	//when he's grounded tell the animation controller 
	animController.SetBool("grounded", true);

	sprite = this.GetComponent(SpriteRenderer);
}

function FixedUpdate () {
	//if moving
	if( rb.velocity.x ){
     	animController.SetBool("moving", true);
	}else{
		animController.SetBool("moving", false);
	}
//rb.velocity.x = rb.velocity.x + acceleration; //or +=acceleration

	var frontFootRay:Vector3 = transform.position;
	frontFootRay.x += 0.4;
	var backFootRay:Vector3 = transform.position;
	backFootRay.x -= 0.3;
//
	Debug.DrawRay(frontFootRay, Vector2.down * 0.01, Color.green, 1);
	Debug.DrawRay(backFootRay, Vector2.down * 0.01, Color.red, 1);

	//gets the position of mario

	var frontFootHit:RaycastHit2D = Physics2D.Raycast( frontFootRay, Vector2.down, 0.01);
	var backFootHit:RaycastHit2D = Physics2D.Raycast( backFootRay, Vector2.down, 0.01);


//

	//Debug.Log( hit.collider);
	//JUMP
	if ( !alreadyJumped && Input.GetAxis("Vertical") > 0 && (frontFootHit.collider || backFootHit.collider)){
		rb.velocity.y = jumpHeight;
		alreadyJumped = true;
	}
	if ( Input.GetAxis("Vertical") == 0 ){
		alreadyJumped = false;
	}
	//right
	if ( Input.GetAxis("Horizontal") > 0){
		//Debug.Log("right/left");
		sprite.flipX = false;
		if (rb.velocity.x < maxSpeed){
			rb.velocity.x = rb.velocity.x + acceleration;
		}
	} else if ( Input.GetAxis("Horizontal") < 0){//left
		//Debug.Log("right/left");
		sprite.flipX = true;
		if (rb.velocity.x > -maxSpeed){
			rb.velocity.x = rb.velocity.x - acceleration;
		}
	}

	//math.abs
//	if ( Input.GetAxis("Vertical") > 0 && backFootHit.collider){
//		Debug.Log("Jump!");
//		rb.velocity.y = jumpHeight;
//	}
////
//	if(rb.velocity.x < maxSpeed)
//     {
////        rb.velocity = rb.velocity.normalized * maxSpeed;
////		rb.velocity.x = rb.velocity.x + acceleration;
//     }
     //Debug.Log(rb.velocity.x);

     //if the raycast hits something
     if (frontFootHit.collider) {
     	animController.SetBool("grounded", true);
     }else{
     	animController.SetBool("grounded", false);
     }

}
//FixedUpdate() alternate to Update, can crash